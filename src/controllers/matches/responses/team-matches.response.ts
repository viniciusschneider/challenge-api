export interface TeamMatchesResponse {
  id: number;
  cep: string;
  city: string;
  complement: string | null;
  date: string;
  localTeamImage: string;
  localTeamName: string;
  neighborhood: string;
  number: string;
  state: string;
  street: string;
  visitingTeamImage: string | null;
  visitingTeamName: string | null;
}
