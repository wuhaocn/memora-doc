package com.memora.manager.support;

import org.springframework.util.StringUtils;

import java.util.Locale;

public final class SlugUtils {
    private SlugUtils() {
    }

    public static String toSlug(String value) {
        if (!StringUtils.hasText(value)) {
            return "untitled";
        }

        String slug = value.trim()
            .toLowerCase(Locale.ROOT)
            .replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]+", "-")
            .replaceAll("^-+|-+$", "");
        return StringUtils.hasText(slug) ? slug : "untitled";
    }
}
