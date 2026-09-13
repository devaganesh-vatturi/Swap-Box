package com.swapbox.resources.model;

public enum ResourceCategory {

    // --- ITEM CATEGORIES ---
    ELECTRONICS(CategoryType.ITEM),
    BOOKS_AND_STUDY(CategoryType.ITEM),
    SPORTS_AND_FITNESS(CategoryType.ITEM),
    TOOLS_AND_EQUIPMENT(CategoryType.ITEM),
    TRAVEL_AND_RECREATION(CategoryType.ITEM),

    // --- SKILL CATEGORIES ---
    TECHNOLOGY(CategoryType.SKILL),
    EDUCATION(CategoryType.SKILL),
    CREATIVE_ARTS(CategoryType.SKILL),
    MUSIC(CategoryType.SKILL),
    PERSONAL_AND_PROFESSIONAL(CategoryType.SKILL);

    private final CategoryType type;

    ResourceCategory(CategoryType type) {
        this.type = type;
    }

    public CategoryType getType() {
        return type;
    }

    public boolean isItem() {
        return this.type == CategoryType.ITEM;
    }

    public boolean isSkill() {
        return this.type == CategoryType.SKILL;
    }

    public enum CategoryType {
        ITEM,
        SKILL
    }
}