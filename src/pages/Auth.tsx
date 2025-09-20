import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Upload, Shield, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import documentoExemplo from "@/assets/documento-exemplo.png";

// helpers
const onlyDigits = (v: string) => v.replace(/\D/g, "");

const formatCPF = (raw: string) => {
  const digits = onlyDigits(raw).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const formatCEP = (raw: string) => {
  const digits = onlyDigits(raw).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

function isValidCPF(raw: string) {
  const cpf = onlyDigits(raw);
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let d1 = 11 - (sum % 11);
  if (d1 >= 10) d1 = 0;
  if (d1 !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  let d2 = 11 - (sum % 11);
  if (d2 >= 10) d2 = 0;
  if (d2 !== parseInt(cpf[10])) return false;

  return true;
}

type Errors = Partial<{
  fullName: string;
  email: string;
  password: string;
  cpf: string;
  cep: string;
  rua: string;
  complemento: string;
  document: string;
}>;

const Auth = () => {
  const navigate = useNavigate();

  // login/signup shared states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup extras
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [complemento, setComplemento] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // Auto-preencher Rua quando CEP tiver 8 dígitos
  useEffect(() => {
    const raw = onlyDigits(cep);
    if (raw.length !== 8) {
      setLoadingCEP(false);
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        setLoadingCEP(true);
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
        const data = await res.json();
        if (!cancelled && !data?.erro) {
          setRua((prev) => (prev?.trim() ? prev : (data?.logradouro ?? "")));
          setErrors((e) => ({ ...e, cep: undefined, rua: undefined }));
        }
      } catch {
        // silencioso
      } finally {
        if (!cancelled) setLoadingCEP(false);
      }
    })();

    return () => {
      cancelled = true;
      setLoadingCEP(false);
    };
  }, [cep]);

  // VALIDATION
  const validateSignup = (): boolean => {
    const newErr: Errors = {};

    if (!fullName.trim()) newErr.fullName = "Nome é obrigatório.";
    if (!email.trim()) newErr.email = "Email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErr.email = "Email inválido.";

    if (!password || password.length < 6) newErr.password = "Senha deve ter pelo menos 6 caracteres.";

    const cpfDigits = onlyDigits(cpf);
    if (!cpfDigits) newErr.cpf = "CPF é obrigatório.";
    else if (!isValidCPF(cpfDigits)) newErr.cpf = "CPF inválido.";

    const cepDigits = onlyDigits(cep);
    if (!cepDigits) newErr.cep = "CEP é obrigatório.";
    else if (cepDigits.length !== 8) newErr.cep = "CEP deve ter 8 dígitos.";

    if (!rua.trim()) newErr.rua = "Rua é obrigatória.";
    if (!complemento.trim()) newErr.complemento = "Complemento é obrigatório.";

    if (!documentFile) newErr.document = "Documento é obrigatório (RG, CNH ou Passaporte).";

    setErrors(newErr);

    if (Object.keys(newErr).length > 0) {
      toast({
        title: "Verifique os campos",
        description: "Existem erros no formulário de cadastro.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setLoading(true);
    try {
      const cpfDigits = onlyDigits(cpf);
      const cepDigits = onlyDigits(cep);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            cpf: cpfDigits,
            cep: cepDigits,
            rua: rua.trim(),
            complemento: complemento.trim(),
          },
        },
      });

      if (error) throw error;

      const userId = data.user?.id;

      if (!userId) {
        toast({
          title: "Erro no cadastro",
          description: "Não foi possível obter o identificador do usuário.",
          variant: "destructive",
        });
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          user_id: userId,
          full_name: fullName.trim(),
          cpf: cpfDigits,
          cep: cepDigits,
          rua: rua.trim(),
          complemento: complemento.trim(),
        });

      if (profileError) {
        toast({
          title: "Erro ao salvar perfil",
          description: profileError.message,
          variant: "destructive",
        });
        return;
      }

      // (Opcional) Fazer upload do documento no Storage aqui, se você já tiver um bucket configurado.

      toast({
        title: "Cadastro realizado!",
        description: "Verifique seu email para confirmar a conta.",
      });
    } catch (error: any) {
      toast({
        title: "Erro no cadastro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/");
      toast({ title: "Login realizado!", description: "Bem-vindo de volta ao TripNation!" });
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDocumentFile(file);
    setErrors((er) => ({ ...er, document: undefined }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-verde-claro to-azul-agua flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-laranja to-amarelo bg-clip-text text-sky-500">
            TripNation
          </CardTitle>
          <CardDescription>Sua aventura brasileira começa aqui</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Cadastro</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            {/* CADASTRO */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="rounded-lg border border-muted-foreground/10 bg-muted/10 p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Informações Pessoais</h3>
                    <p className="text-xs text-muted-foreground">
                      Informe seus dados básicos para criarmos sua conta.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nome Completo</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        placeholder="Ex.: Maria Silva"
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setErrors((er) => ({ ...er, fullName: undefined }));
                        }}
                        required
                      />
                      {errors.fullName && <p className="text-xs text-red-600">{errors.fullName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        value={email}
                        placeholder="voce@email.com"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors((er) => ({ ...er, email: undefined }));
                        }}
                        required
                      />
                      {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Senha</Label>
                      <div className="relative">
                        <Input
                          id="signupPassword"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((er) => ({ ...er, password: undefined }));
                          }}
                          required
                          minLength={6}
                          placeholder="Mínimo 6 caracteres"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        inputMode="numeric"
                        maxLength={14}
                        value={cpf}
                        onChange={(e) => {
                          setCpf(formatCPF(e.target.value));
                          setErrors((er) => ({ ...er, cpf: undefined }));
                        }}
                        placeholder="000.000.000-00"
                        required
                      />
                      {errors.cpf && <p className="text-xs text-red-600">{errors.cpf}</p>}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-muted-foreground/10 bg-muted/10 p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Endereço</h3>
                    <p className="text-xs text-muted-foreground">
                      Precisamos dessas informações para planejar a melhor experiência.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="cep">CEP</Label>
                        <Input
                          id="cep"
                          inputMode="numeric"
                          maxLength={9}
                          value={cep}
                          onChange={(e) => {
                            const formatted = formatCEP(e.target.value);
                            setCep(formatted);
                            setErrors((er) => ({ ...er, cep: undefined }));
                          }}
                          placeholder="00000-000"
                          required
                        />
                        {loadingCEP && (
                          <p className="text-xs text-gray-500 mt-1">Buscando endereço…</p>
                        )}
                        {errors.cep && <p className="text-xs text-red-600">{errors.cep}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rua">Rua</Label>
                        <Input
                          id="rua"
                          type="text"
                          value={rua}
                          onChange={(e) => {
                            setRua(e.target.value);
                            setErrors((er) => ({ ...er, rua: undefined }));
                          }}
                          placeholder="Rua Exemplo"
                          required
                        />
                        {errors.rua && <p className="text-xs text-red-600">{errors.rua}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input
                        id="complemento"
                        type="text"
                        value={complemento}
                        onChange={(e) => {
                          setComplemento(e.target.value);
                          setErrors((er) => ({ ...er, complemento: undefined }));
                        }}
                        placeholder="Apto, bloco, ponto de referência…"
                        required
                      />
                      {errors.complemento && (
                        <p className="text-xs text-red-600">{errors.complemento}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* UPLOAD DOCUMENTO */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Upload de Documento (Obrigatório)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">RG, CNH ou Passaporte</p>

                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="document-upload"
                    />
                    <Label htmlFor="document-upload" className="cursor-pointer text-primary hover:underline">
                      Escolher arquivo
                    </Label>

                    {documentFile && (
                      <p className="text-sm text-green-600 mt-2">✓ {documentFile.name}</p>
                    )}
                    {errors.document && <p className="text-xs text-red-600 mt-2">{errors.document}</p>}
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900">Segurança Garantida</p>
                        <p className="text-blue-700">
                          Seu documento é usado apenas para verificação e será protegido conforme a LGPD.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Exemplo de documento:</p>
                    <img
                      src={documentoExemplo}
                      alt="Exemplo de documento"
                      className="mx-auto max-w-32 rounded border"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Criando conta..." : "Criar Conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
