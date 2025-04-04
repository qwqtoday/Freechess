import { usePlayersNames } from "@/hooks/usePlayerNames";
import { Grid2 as Grid, Typography } from "@mui/material";
import { gameAtom, gameEvalAtom } from "../../../states";
import { MoveClassification } from "@/types/enums";
import { calculateAverageCentipawnLoss, calculateEstimatedRating } from "@/types/eval";
import ClassificationRow from "./classificationRow";
import { useAtomValue } from "jotai";


export default function MovesClassificationsRecap() {
  const { whiteName, blackName } = usePlayersNames(gameAtom);
  const gameEval = useAtomValue(gameEvalAtom);

  if (!gameEval?.positions.length) return null;

  const averageCentipawnLoss = calculateAverageCentipawnLoss(gameEval);
  const whiteRating = calculateEstimatedRating(averageCentipawnLoss);
  const blackRating = calculateEstimatedRating(averageCentipawnLoss);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      rowGap={1}
      sx={{ scrollbarWidth: "thin", overflowY: "auto" }}
      maxHeight="100%"
      size={6}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        wrap="nowrap"
        size={12}
      >
        <Typography width="10rem" align="center" noWrap fontSize="0.9rem">
          {whiteName} (~{whiteRating})
        </Typography>

        <Typography width="7rem" />

        <Typography width="10rem" align="center" noWrap fontSize="0.9rem">
          {blackName} (~{blackRating})
        </Typography>
      </Grid>

      {sortedMoveClassfications.map((classification) => (
        <ClassificationRow
          key={classification}
          classification={classification}
        />
      ))}
    </Grid>
  );
}

export const sortedMoveClassfications = [
  MoveClassification.Brilliant,
  MoveClassification.Great,
  MoveClassification.Best,
  MoveClassification.Excellent,
  MoveClassification.Good,
  MoveClassification.Book,
  MoveClassification.Inaccuracy,
  MoveClassification.Mistake,
  MoveClassification.Blunder
];
