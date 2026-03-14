import Typography from "@mui/material/Typography";
import JokeForm from "@/components/jokes/JokeForm";

export default function UpsertPage() {
  return (
    <div className="jokeForm">
      <main>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ mt: 2, fontWeight: 500 }}
        >
          Post a new joke
        </Typography>
        <JokeForm />
      </main>
    </div>
  );
}
