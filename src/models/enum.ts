export enum TokenType {
  CONFIRM_EMAIL,
  RESET_PASSWORD,
  REFRESH_TOKEN,
}
export enum Role {
  MEMBER,
  ARTIST,
  ADMIN,
}
export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}
export enum PlaylistStatus {
  PUBLIC,
  PRIVATE,
}

export enum Language {
  NONE,
  JAPANESE,
  VIETNAMESE,
  ENGLISH,
  CHINESE,
  KOREAN,
}
 const Enums = {
  TokenType :TokenType,
  Language:Language,
  Role:Role,
  Gender:Gender,
  PlaylistStatus:PlaylistStatus,
};
export default Enums;
