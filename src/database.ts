type Profile = {
  uid: string;
  firstName: string;
  lastName: string;
  age: number;
};

export function loadProfiles(): Promise<Profile[]> {
  const profilesDb: Profile[] = [];

  function generateRandomName(): string {
    const names: string[] = ["John", "Alice", "Bob", "Emma", "James", "Olivia"];
    return names[Math.floor(Math.random() * names.length)];
  }

  function generateRandomLastName(): string {
    const lastNames: string[] = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  function generateUID(): string {
    return Math.random().toString(36).substring(2);
  }

  function generateRandomProfile(): Profile {
    return {
      uid: generateUID(),
      firstName: generateRandomName(),
      lastName: generateRandomLastName(),
      age: Math.floor(Math.random() * 100) + 1,
    };
  }

  for (let i = 0; i < 3; i++) {
    profilesDb.push(generateRandomProfile());
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profilesDb);
    }, 3000);
  });
}
