interface FetchOptions extends RequestInit {
  url: string;
}

const fetchAsync = async <S>(options: FetchOptions) => {
  try {
    const { url, ...others } = options;
    const response = await fetch(url, others);
    return response.json() as Promise<S>;
  } catch (error: any) {
    console.error('Something is not quite right. Please try again');
    return null;
  }
};

export default fetchAsync;
