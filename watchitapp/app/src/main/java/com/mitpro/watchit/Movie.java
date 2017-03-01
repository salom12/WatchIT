package com.mitpro.watchit;

import android.os.Parcel;
import android.os.Parcelable;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Created by jose on 10/6/15.
 */
public class Movie implements Parcelable{
    private String title;
    @SerializedName("poster")
    private String poster;
    @SerializedName("soruces")
    private String soruces;
    //@SerializedName("backdrop")
    private String backdrop = "https://s-media-cache-ak0.pinimg.com/originals/6d/8a/5d/6d8a5d3aa9c25dbcdd0ed2397a282b54.jpg";

    public Movie() {}


    protected Movie(Parcel in)
    {
        title = in.readString();
        poster = in.readString();
        soruces = in.readString();
        backdrop = in.readString();
    }



    public static final Creator<Movie> CREATOR = new Creator<Movie>() {
        @Override
        public Movie createFromParcel(Parcel in) {
            return new Movie(in);
        }

        @Override
        public Movie[] newArray(int size) {
            return new Movie[size];
        }
    };

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getSoruces() {
        return soruces;
    }

    public void setSoruces(String genres) {
        this.soruces = genres;
    }

    public String getBackdrop() {
        return  backdrop;
    }

    public void setBackdrop(String backdrop) {
        this.backdrop = backdrop;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i)
    {
        parcel.writeString(title);
        parcel.writeString(poster);
        parcel.writeString(soruces);
        parcel.writeString(backdrop);
    }

    public static class MovieResult
    {
        private List<Movie> results;
        public List<Movie> getResults() {
            return results;
        }
    }
}
