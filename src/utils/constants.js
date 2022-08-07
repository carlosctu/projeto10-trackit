import "dayjs/locale/pt-br";
import dayjs from "dayjs";

export const defaultMessage =
  "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!";
export const defaultMessage2 = "Você não tem nenhum habito por fazer hoje!";
export const defaultMessage3 =
  "Em breve você poderá ver o histórico dos seus hábitos aqui!";

export const days = [
  { id: 0, day: "D" },
  { id: 1, day: "S" },
  { id: 2, day: "T" },
  { id: 3, day: "Q" },
  { id: 4, day: "Q" },
  { id: 5, day: "S" },
  { id: 6, day: "S" },
];

export const date = dayjs().format("DD/MM ");
export const weekday = dayjs().locale("pt-br").format("dddd");
