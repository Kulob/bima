
export const createCorsProxyUrl = (targetUrl: string): string => {

  const corsProxies = [
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://api.codetabs.com/v1/proxy?quest='
  ];
  
  const proxyUrl = corsProxies[0];
  return `${proxyUrl}${encodeURIComponent(targetUrl)}`;
};

export const fetchWithCorsProxy = async (url: string): Promise<Response> => {
  const proxiedUrl = createCorsProxyUrl(url);
  
  try {
    const response = await fetch(proxiedUrl);
    return response;
  } catch (error) {
    console.error('CORS proxy failed:', error);
    throw new Error('Unable to fetch data due to CORS restrictions');
  }
};