
export interface Tourney {
  _id:      string;
  name:    string;
  inscriptionDeadline: string;
  year: string;
  picture: string;
  enrolledPlayers: Array<string>;
  selectedPlayers: Array<string>;
  games: Array<string>;
  classification: Array<string>;
}
