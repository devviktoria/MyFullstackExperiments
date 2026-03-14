import Typography from "@mui/material/Typography";
import JokeForm from "@/components/jokes/JokeForm";

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
          Modify a joke
        </Typography>
        <JokeForm jokeId={id} />
      </main>
    </div>
  );
}
