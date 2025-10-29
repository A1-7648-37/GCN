// functions/api/[[path]].js
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // 提取路径
  const path = url.pathname.replace('/api/', '');
  const searchParams = url.searchParams.toString();
  
  // 构建 Supabase URL
  const supabaseUrl = `https://ueoplwnweruxrnpvtbdu.supabase.co/${path}${searchParams ? '?' + searchParams : ''}`;
  
  console.log('Proxying to:', supabaseUrl);
  
  try {
    // 复制请求，修改目标 URL
    const proxyRequest = new Request(supabaseUrl, {
      method: request.method,
      headers: new Headers(request.headers),
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    });
    
    // 设置 Supabase 认证头
    proxyRequest.headers.set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb3Bsd253ZXJ1eHJucHZ0YmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDU1MzIsImV4cCI6MjA3NzEyMTUzMn0.g2Mu2isNpXjEqyYOoqMrfvdco5N-P6f2_j92V5Fjzig');
    proxyRequest.headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlb3Bsd253ZXJ1eHJucHZ0YmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDU1MzIsImV4cCI6MjA3NzEyMTUzMn0.g2Mu2isNpXjEqyYOoqMrfvdco5N-P6f2_j92V5Fjzig`);
    
    // 移除可能引起问题的头
    proxyRequest.headers.delete('cookie');
    
    const response = await fetch(proxyRequest);
    
    // 创建新的响应并保持 CORS 头
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', '*');
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'API proxy failed', 
      message: error.message,
      supabase_url: 'https://ueoplwnweruxrnpvtbdu.supabase.co'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}