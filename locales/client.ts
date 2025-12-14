"use client";

import { createI18nClient } from 'next-international/client';

export const languages = ["en", "fr", "es", "zh-CN", "ru", "pt"];

export const { useI18n, I18nProviderClient } = createI18nClient(
    {
        en: async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return import("./en");
        },
        fr: async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return import("./fr");
        },
        es: async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return import("./es");
        },
        "zh-CN": async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return import("./zh-CN");
        },
        ru: async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return import("./ru");
        },
        pt: async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return import("./pt");
        },
    }
)
