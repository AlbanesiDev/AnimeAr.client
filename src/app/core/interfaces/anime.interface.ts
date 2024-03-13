export interface AnimeInterface {
  title: string;
  type: Type;
  txtAlt: string[];
  genres: string[];
  synopsis: string;
  cover: string;
  status: Status;
  relatedAnimes: RelatedAnime[];
  episodes: Episode[];
}

export type Type = "Anime" | "OVA" | "Película" | "Especial";

export type Status = "Finalizado" | "En emisión" | "Próximamente";

export interface RelatedAnime {
  title: string;
  relation: Relation;
}

export type Relation = "Precuela" | "Secuela" | "Historia principal" | "Historia paralela";

export interface Episode {
  title: string;
  videos: VideoServer[];
}

export interface VideoServer {
  server: string;
  title: string;
  url: string;
}
