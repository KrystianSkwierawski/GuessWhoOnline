using System.Collections.Generic;

namespace Domain
{
    public static class Characters
    {
        public static List<string> CharacterNames = new List<string>();

        static Characters()
        {
            CharacterNames.Add("Animu");
            CharacterNames.Add("Dawid");
            CharacterNames.Add("Dodek");
            CharacterNames.Add("Filip");
            CharacterNames.Add("Filippa");
            CharacterNames.Add("Krystian");
            CharacterNames.Add("Leon");
        }
    }
}
