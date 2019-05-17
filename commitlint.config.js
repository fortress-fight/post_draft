module.exports = {
    extends: ["@commitlint/config-angular"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "🚀  feature",
                "📦  build",
                "📚  docs",
                "🚑  fix",
                "🎨  style",
                "🔨  refactor",
                "📝  perf",
                "🔫  test",
                "⚙️  chore",
                "📥  merge",
                "⏪  revert",
                "🏃  WIP"
            ]
        ]
    },
    parserPreset: {
        parserOpts: {
            headerPattern: /^(.*\s{2}\w+)\((.+)\).*:\s*(.*)\s*$/,
            headerCorrespondence: ["type", "scope", "subject"]
        }
    }
};
