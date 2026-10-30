// 경로 첫 마디 → 연결할 서비스 이름
// 지금은 서비스가 없으므로 비워 둡니다.
const ROUTES = {
  // 예시: reborn: "REBORN",
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const first = url.pathname.split("/")[1];   // "/reborn/a.js" → "reborn"
    const binding = Object.hasOwn(ROUTES, first) ? ROUTES[first] : null;

    if (binding) {
      // "/reborn" 처럼 끝에 / 가 없으면 "/reborn/" 로 보냄
      if (url.pathname === `/${first}`) {
        url.pathname = `/${first}/`;
        return Response.redirect(url.toString(), 301);
      }
      // 해당 서비스로 요청을 그대로 넘김
      return env[binding].fetch(request);
    }

    // 등록된 서비스가 아니면 게이트웨이 자신의 파일(랜딩 페이지 등)을 보여줌
    return env.ASSETS.fetch(request);
  },
};
