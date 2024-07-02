package io.openems.edge.controller.ess.imbalance.edmij.api;

import okhttp3.Request;
import okhttp3.Route;
import okhttp3.Response;
import okhttp3.Authenticator;
import java.io.IOException;

public class OAuth2Authenticator implements Authenticator {
  private final EdmijAuthRepository repository;
  final int maxAuthAttempts = 3;
  private int authAttempts = 0;

  public OAuth2Authenticator(EdmijAuthRepository repository) {
    this.repository = repository;
  }


  @Override
  public Request authenticate(Route route, Response response) throws IOException {
      if (authAttempts < maxAuthAttempts) {
          authAttempts++;
          this.repository.refresh();
          return response.request().newBuilder()
              .header("Authorization", "Bearer " + this.repository.getAccessToken())
              .build();
      } else {
          // If the maximum number of authentication attempts is reached, stop retrying.
          return null;
      }
  }
}