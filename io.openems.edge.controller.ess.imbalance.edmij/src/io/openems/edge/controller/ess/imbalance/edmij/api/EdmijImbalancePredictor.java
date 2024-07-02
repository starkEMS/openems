package io.openems.edge.controller.ess.imbalance.edmij.api;

import java.io.IOException;
import java.lang.reflect.Type;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.TypeAdapter;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;

public class EdmijImbalancePredictor {
	private static final String EDMIJ_BASE_URL = "trading.edmij.nl";
	private final EdmijAuthRepository repository;
	private final OkHttpClient client;
	private final Gson gson = new GsonBuilder()
			.registerTypeAdapter(ZonedDateTime.class, new TypeAdapter<ZonedDateTime>() {
				@Override
				public void write(JsonWriter out, ZonedDateTime value) throws IOException {
					out.value(value.toString());
				}

				@Override
				public ZonedDateTime read(JsonReader in) throws IOException {
					return ZonedDateTime.parse(in.nextString());
				}
			}).enableComplexMapKeySerialization().create();
	private final Type responseType = new TypeToken<List<Perdiction>>() {
	}.getType();

	public EdmijImbalancePredictor(String email, String password, boolean debug) {
		this.repository = new EdmijAuthRepository(email, password);
		var builder = new OkHttpClient.Builder().addInterceptor(new OAuth2Interceptor(this.repository))
				.authenticator(new OAuth2Authenticator(this.repository));
		if (debug) {
			builder.addInterceptor(new HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY));
		}
		this.client = builder.build();
	}

	public List<Perdiction> predict(ZonedDateTime startTime) throws IOException {
		var url = new HttpUrl.Builder().scheme("https").host(EDMIJ_BASE_URL)
				.addPathSegments("api/v1/ImbalancePricePredictions")
				.setQueryParameter("StartDateTime", startTime.format(DateTimeFormatter.ISO_INSTANT)).build();
		var request = new Request.Builder().url(url).build();
		var response = this.client.newCall(request).execute();
		if (!response.isSuccessful()) {
			throw new IOException("Unexpected code " + response);
		}
		return this.gson.fromJson(response.body().string(), responseType);

	}

}
