using Microsoft.EntityFrameworkCore;

namespace jcdatabase.Models
{
    [PrimaryKey(nameof(JokeId), nameof(ResponseDay))]
    public class ResponseStatistic
    {
        public int JokeId { get; set; }

        public DateOnly ResponseDay { get; set; }

        public int Counter { get; set; }
    }
}