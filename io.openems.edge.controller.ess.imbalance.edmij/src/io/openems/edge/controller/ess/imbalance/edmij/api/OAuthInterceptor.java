package io.openems.edge.controller.ess.imbalance.edmij.api;

import okhttp3.Interceptor;
import okhttp3.Response;
import java.io.IOException;

class OAuth2Interceptor implements Interceptor {
	private final EdmijAuthRepository repository;

	public OAuth2Interceptor(EdmijAuthRepository repository) {
		this.repository = repository;
	}

	@Override
	public Response intercept(Interceptor.Chain chain) throws IOException {
		return chain.proceed(chain.request().newBuilder().header("Authorization",
				"Bearer " + this.repository.getAccessToken()).build());
	}
}