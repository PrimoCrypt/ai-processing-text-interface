interface LanguageSelectorProps {
    selectedLanguage: string
    onSelectLanguage: (language: string) => void
  }
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'es', name: 'Spanish' },
    { code: 'ru', name: 'Russian' },
    { code: 'tr', name: 'Turkish' },
    { code: 'fr', name: 'French' },
  ]
  
  export default function LanguageSelector({ selectedLanguage, onSelectLanguage }: LanguageSelectorProps) {
    return (
      <div className="p-1 sm:p-1.5 border-gray-700 bg-gray-850">
        <select
          value={selectedLanguage}
          onChange={(e) => onSelectLanguage(e.target.value)}
          className=" sm:w-full  p-1 sm:p-2 border border-gray-600 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-gray-700 text-white">
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    )
  }
