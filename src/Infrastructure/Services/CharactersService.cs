using Application.Common.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Infrastructure.Services
{
    public class CharactersService : ICharactersService
    {
        private List<string> _characterNames = new List<string>();

        public CharactersService()
        {
            StartUp();
        }

        public List<string> GetCharacterNames()
        {
            return _characterNames;
        }

        void StartUp()
        {
            string applicationPath = GetApplicationRoot();
            string charactersPath = applicationPath + @"/wwwroot/images/characters";

            DirectoryInfo directoryInfo = new DirectoryInfo(charactersPath);
            FileInfo[] files = directoryInfo.GetFiles("*.webp");

            AddFilesNamesToList(files);
        }

        void AddFilesNamesToList(FileInfo[] files)
        {
            foreach (var file in files)
            {
                string characterName = file.Name.Replace(".webp", "");
                _characterNames.Add(characterName);
            }
        }

        public string GetApplicationRoot()
        {
            var exePath = Path.GetDirectoryName(System.Reflection
                              .Assembly.GetExecutingAssembly().CodeBase);

            Regex appPathMatcher = new Regex(@"(?<!fil)[A-Za-z]:\\+[\S\s]*?(?=\\+bin)");

            string appRoot = appPathMatcher.Match(exePath).Value;

            return appRoot;
        }
    }
}
