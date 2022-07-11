export interface IGlobalCode {
  globalCode: string;
}


export interface ILoader {
  setLoading: (isLoading: boolean) => void | undefined;
}

export interface ILoading {
  isLoading: boolean;
}
