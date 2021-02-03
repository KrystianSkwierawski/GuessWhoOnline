using Application.Common.Interfaces;
using System.Collections.Generic;
using System.IO;

namespace Infrastructure.Services
{
    public class CharactersService : ICharactersService
    {
        private static List<string> _characterNames = new List<string>();

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
            string charactersPath = @"./wwwroot/images/characters";

            DirectoryInfo directoryInfo = new DirectoryInfo(charactersPath);
            FileInfo[] files = directoryInfo.GetFiles("*.jpg");

            AddFilesNamesToList(files);
        }

        void AddFilesNamesToList(FileInfo[] files)
        {
            foreach (var file in files)
            {
                string characterName = file.Name.Replace(".jpg", "");
                _characterNames.Add(characterName);
            }
        }

    }
}
