export interface Rule {
  id: string;
  description: string;
  match(ctx: any): boolean;
  generateFix(ctx: any): Fix;
}

export interface Fix {
  description: string;
  patch: {
    file: string | null;
    apply: (obj: any) => any;
  };
}