package io.openems.edge.controller.ess.imbalance.edmij.api;

import java.time.ZonedDateTime;

public record Perdiction(ZonedDateTime startDateTime, Float priceTake, Float priceFeed) {
}
