﻿using System.Collections.Generic;
using System.IO;

namespace Domain
{
    public static class Characters
    {
        public static List<string> CharacterNames = new List<string>();

        static Characters()
        {
            StartUp();
        }

        static void StartUp()
        {
            string charactersPath = @"./wwwroot/images/characters";

            DirectoryInfo directoryInfo = new DirectoryInfo(charactersPath);
            FileInfo[] files = directoryInfo.GetFiles("*.jpg"); 

            AddFilesNamesToList(files);
        }

        static void AddFilesNamesToList(FileInfo[] files)
        {
            foreach(var file in files)
            {
                string characterName = file.Name.Replace(".jpg", "");
                CharacterNames.Add(characterName);
            }
        }
    }
}
