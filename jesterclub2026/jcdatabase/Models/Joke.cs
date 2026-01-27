using System.ComponentModel.DataAnnotations;

namespace jcdatabase.Models
{
    public class Joke
    {
        public int JokeId { get; set; }

        [MaxLength(500)]
        [Required]
        public required string JokeText { get; set; }

        [MaxLength(200)]
        public string? Source { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? ReleasedDate { get; set; }

        public int ResponseSum { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }

        public ICollection<Tag>? Tags { get; set; }

        public ICollection<EmotionCounter>? EmotionCounters { get; set; }

        public ICollection<ResponseStatistic>? ResponseStatistics { get; set; }
    }
}