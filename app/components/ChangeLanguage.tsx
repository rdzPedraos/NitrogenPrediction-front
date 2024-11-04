import { useTranslation } from "react-i18next";

export default function ChangeLanguage() {
    const { i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        return () => i18n.changeLanguage(lang);
    };

    return (
        <div className="flex gap-2">
            {["es", "en"].map((lang) => {
                const active = i18n.language === lang;
                return (
                    <button
                        key={lang}
                        onClick={changeLanguage(lang)}
                        className={active ? "shadow shadow-secondary" : ""}
                    >
                        <img
                            className="cursor-pointer w-8 h-5"
                            src={`/flags/${lang}.png`}
                            alt={lang}
                        />
                    </button>
                );
            })}
        </div>
    );
}
