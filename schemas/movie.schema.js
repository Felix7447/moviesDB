const z = require('zod')

const movie = z.object({
  title: z.string({
    required_error: 'title is required',
    invalid_type_error: 'title must be a string'
  }).min(3).max(255),
  year: z.number().int().min(1900).max(2024),
  director: z.string().min(3).max(255),
  duration: z.number().int().min(1),
  poster: z.string().url(),
  genre: z.array(z.enum(['Action', 'Drama', 'Crime', 'Adventure', 'Sci-fi', 'Romance'])),
  rate: z.number().min(0).max(10)
})

const createMovieSchema = input => {
  return movie.partial({ rate: true }).safeParse(input)
}
const updateMovieSchema = input => {
  return movie.partial().safeParse(input)
}

module.exports = { createMovieSchema, updateMovieSchema }
