interface Site {
  name: string,
  footerRight: string,
}

interface Api {
  origin: string,
  basePath: string,
}

interface Post {
  serviceId: string,
}

export interface Config {
  site: Site,
  api: Api,
  post: Post,
}