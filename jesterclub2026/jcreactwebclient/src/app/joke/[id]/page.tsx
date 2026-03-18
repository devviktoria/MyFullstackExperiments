import Typography from "@mui/material/Typography";
import JokeStatistics from "@/components/jokes/JokeStatistics";

export default async function UpsertPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="jokeForm">
      <main>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ mt: 2, fontWeight: 500 }}
        >
          Joke Statistics
        </Typography>
        <JokeStatistics jokeId={id} />
      </main>
    </div>
  );
}
