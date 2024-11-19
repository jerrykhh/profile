# Configuration

## Navigation
- /app/data/navigation.ts

### Schema
```
# Navigation Item
{
    name: string;
    route: string;
    icon: LucideIcon;
}
```

## profile
- /app/data/profile.ts

### Schema
```
{
    name: string;
    image: string; # please put in public/static/images/profile/
    welcomeHeading?: string;
    description: string;
    todo: {
        title: string; # Todo Card Title
        description: string; # Todo Card Description
        items: {
            description: string;
            completed: boolean;
        }[];
    }
    social?: {
        key: string; # for mapping to icon
        username?: string;
        url: string;
    }[];
    techs?: {
        [key: string]: string[]; # key is the category of tech, value is the tech list will be mapped to same name image in /static/images/tech/
    }
}
```

## Project
- /app/data/project/

### Markdown Metadata Schema (yaml)
```
# slug.md
meta:
    - slug: string;
    - title: string;
    - description: string;
    - createdAt: string; # will be convert to Date Object, format is YYYY-MM-DD
    - tags: string[];
    - repository?: string;
    - techs?: string[]; # such as TypeScript, Nextjs, TailwindCSS
```