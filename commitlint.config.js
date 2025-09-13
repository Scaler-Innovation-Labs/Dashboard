module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [
    {
      rules: {
        "custom-type-validation": (parsed) => {
          const { type } = parsed;
          const allowedTypes = ["feat", "fix", "chore", "hotfix"];
          const errors = [];

          if (!type) {
            return [
              false,
              `\x1b[31mType is required!\x1b[0m\n\n\x1b[32mUse one of: ${allowedTypes.join(", ")}\x1b[0m\n\x1b[32mExample: "feat: Add User Authentication"\x1b[0m`,
            ];
          }
          if (!allowedTypes.includes(type.toLowerCase())) {
            errors.push(`\x1b[31mInvalid type "${type}"\x1b[0m`);
            errors.push(
              `\x1b[32mUse one of: ${allowedTypes.join(", ")}\x1b[0m`,
            );
            const suggestions = allowedTypes.filter(
              (t) =>
                t.includes(type.toLowerCase()) ||
                type.toLowerCase().includes(t),
            );

            if (suggestions.length > 0) {
              errors.push(
                `\x1b[33mDid you mean: ${suggestions.join(" or ")}?\x1b[0m`,
              );
            }
          }
          if (type !== type.toLowerCase()) {
            errors.push(
              `\x1b[31mType should be lowercase: "${type.toLowerCase()}" not "${type}"\x1b[0m`,
            );
          }

          if (errors.length > 0) {
            return [
              false,
              `\n${errors.join("\n")}\n\n\x1b[32mCorrect format: "feat: Add User Authentication"\x1b[0m`,
            ];
          }

          return [true];
        },

        "custom-subject-validation": (parsed) => {
          const { subject } = parsed;
          const errors = [];

          if (!subject) {
            return [
              false,
              '\x1b[31mSubject is required!\x1b[0m \x1b[32mExample: "Add User Authentication"\x1b[0m',
            ];
          }

          if (subject.endsWith(".")) {
            errors.push("\x1b[31mRemove the period (.) at the end\x1b[0m");
          }

          if (subject[0] !== subject[0].toUpperCase()) {
            errors.push(
              `\x1b[31mStart with uppercase:\x1b[0m \x1b[32m"${subject[0].toUpperCase()}${subject.slice(1)}"\x1b[0m`,
            );
          }

          const words = subject.split(" ");
          const incorrectWords = words.filter((word, index) => {
            if (index === 0) return false;
            return word[0] !== word[0].toUpperCase();
          });

          if (incorrectWords.length > 0) {
            errors.push(
              `\x1b[31mCapitalize words in commit like:\x1b[0m \x1b[32m${incorrectWords.map((w) => `"${w[0].toUpperCase()}${w.slice(1)}"`).join(", ")}\x1b[0m`,
            );
          }

          if (subject.length < 3) {
            errors.push(
              "\x1b[31mSubject too short (minimum 3 characters)\x1b[0m",
            );
          }

          if (subject.length > 72) {
            errors.push(
              `\x1b[31mSubject too long (${subject.length}/72 characters).\x1b[0m \x1b[32mTry: "${subject.slice(0, 69)}..."\x1b[0m`,
            );
          }

          if (errors.length > 0) {
            return [
              false,
              `\n${errors.join("\n")}\n\n\x1b[32mCorrect format: "feat: Add User Authentication"\x1b[0m`,
            ];
          }

          return [true];
        },

        "custom-format-validation": (parsed) => {
          const { header } = parsed;
          const errors = [];

          if (!header.includes(":")) {
            errors.push("\x1b[31mMissing colon (:) after type\x1b[0m");
            errors.push('\x1b[32mFormat should be: "type: subject"\x1b[0m');
          }

          const colonIndex = header.indexOf(":");
          if (colonIndex !== -1 && header[colonIndex + 1] !== " ") {
            errors.push("\x1b[31mAdd a space after the colon\x1b[0m");
            errors.push(
              `\x1b[32mChange "${header}" to "${header.slice(0, colonIndex + 1)} ${header.slice(colonIndex + 1).trim()}"\x1b[0m`,
            );
          }

          if (errors.length > 0) {
            return [
              false,
              `\n${errors.join("\n")}\n\n\x1b[32mCorrect format: "feat: Add User Authentication"\x1b[0m`,
            ];
          }

          return [true];
        },
      },
    },
  ],

  rules: {
    "type-enum": [2, "always", ["feat", "fix", "chore", "hotfix"]],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "header-max-length": [2, "always", 100],
    // already handled by custom-subject-validation
    "subject-case": [0],
    "subject-full-stop": [0],
    "subject-max-length": [0],
    "custom-type-validation": [2, "always"],
    "custom-subject-validation": [2, "always"],
    "custom-format-validation": [2, "always"],
  },
};
