using System.ComponentModel.DataAnnotations;

namespace jcdatabase.Models
{
    public class User
    {
        public int UserId { get; set; }

        [MaxLength(200)]
        [Required]
        public required string UserName { get; set; }

        [MaxLength(255)]
        public string? UserEmail { get; set; }

        public ICollection<Joke>? Jokes { get; set; }
    }
}