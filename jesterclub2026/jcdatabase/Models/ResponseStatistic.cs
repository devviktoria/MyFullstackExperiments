using Microsoft.EntityFrameworkCore;

namespace jcdatabase.Models
{
    [PrimaryKey(nameof(JokeId), nameof(Day))]
    public class ResponseStatistic
    {
        public int JokeId { get; set; }

        public DateOnly Day { get; set; }

        public int Counter { get; set; }
    }
}