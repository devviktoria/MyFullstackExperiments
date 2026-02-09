using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace jcdatabase.Models;

[PrimaryKey(nameof(JokeId), nameof(UserId), nameof(CreatedAt))]
public class JokeUserResponse
{
    public int JokeId { get; set; }

    public int UserId { get; set; }

    public DateTime CreatedAt { get; set; }

    [Column(TypeName = "varchar(10)")]
    [Required]
    public required string Emotion { get; set; }
}

