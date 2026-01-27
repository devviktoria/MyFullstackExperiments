using System.ComponentModel.DataAnnotations;

namespace jcdatabase.Models
{
    public class Tag
    {
        public int TagId { get; set; }

        [MaxLength(200)]
        [Required]
        public required string Name { get; set; }

        public ICollection<Joke>? Jokes { get; set; }
    }
}