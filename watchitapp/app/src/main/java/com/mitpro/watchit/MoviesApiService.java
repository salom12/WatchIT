package com.mitpro.watchit;

import retrofit.Callback;
import retrofit.http.GET;

public interface MoviesApiService
{
    @GET("/api/list?sort=yearnew")
    void getPopularMovies(Callback<Movie.MovieResult> cb);
}
