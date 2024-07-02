package io.openems.edge.controller.ess.imbalance.edmij.api;

import com.google.gson.Gson;
import okhttp3.OkHttpClient;
import okhttp3.FormBody;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.logging.HttpLoggingInterceptor;

import java.io.IOException;

public class EdmijAuthRepository {
	private static final String EDMIJ_API_URL = "https://trading.edmij.nl";
	private static final String TOKEN_ENDPOINT = "/connect/token";
	private Authentication authentication = new Authentication(null, null);
	private String email;
	private String password;
	private OkHttpClient client;
	

	public String refresh() throws IOException {
		if (this.getRefreshToken() != null) {
			this.executeRequest(new FormBody.Builder().add("grant_type", "refresh_token")
					.add("refresh_token", this.getRefreshToken()).add("scope", "openid offline_access roles")
					.add("resource", EDMIJ_API_URL).build());
		} else {
			this.login();
		}
		return this.getAccessToken();
	}

	private void executeRequest(FormBody requestBody) throws IOException {
		Request request = new Request.Builder().url(EDMIJ_API_URL + TOKEN_ENDPOINT)
				.header("Content-Type", "application/x-www-form-urlencoded").post(requestBody).build();

		try (Response response = this.client.newCall(request).execute()) {
			if (!response.isSuccessful()) {
				throw new IOException("Unexpected response code: " + response);
			}
			Gson gson = new Gson();
			this.authentication = gson.fromJson(response.body().string(), Authentication.class);
		} catch (IOException e) {
			this.authentication = new Authentication(null, null);
			e.printStackTrace();
		}
	}

	private void login() throws IOException {
		this.executeRequest(new FormBody.Builder().add("grant_type", "password").add("username", this.email)
				.add("password", this.password).add("scope", "openid offline_access roles")
				.add("resource", EDMIJ_API_URL).build());
	}

	public EdmijAuthRepository(String email, String password) {
		 HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
	        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
		this.email = email;
		this.password = password;
		client = new OkHttpClient.Builder().addInterceptor(loggingInterceptor).build();
	}

	public String getAccessToken() {
		return this.authentication.access_token();
	}

	private String getRefreshToken() {
		return this.authentication.refresh_token();
	}
}