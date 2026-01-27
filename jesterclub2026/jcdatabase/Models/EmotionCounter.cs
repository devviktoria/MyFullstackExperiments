using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace jcdatabase.Models
{
    [PrimaryKey(nameof(JokeId), nameof(Emotion))]
    public class EmotionCounter
    {

        public int JokeId { get; set; }

        [Column(TypeName = "varchar(10)")]
        [Required]
        public required string Emotion { get; set; }

        public int Counter { get; set; }
    }
}