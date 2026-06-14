import json
import random

def detect_category(product_name):
    """
    Detects the main category based on a dictionary of common synonyms.
    Checks 'Kid' and 'Women' first to ensure correct routing.
    """
    name_lower = product_name.lower()
    
    # Updated Synonym Map
    synonyms_map = {
        "Kid": ["kid", "kids", "child", "children", "toddler", "infant", "baby", "boy", "boys", "girl", "girls"],
        "Women": ["women", "woman", "ladies", "lady", "female", "saree", "kurtis", "lehenga","top","tops","skirts","dress"],
        "Men": ["men", "man", "gents", "gent", "male","vest","vests"]
    }
    
    # 1. Check Kids first (so 'boys'/'girls' are immediately isolated from adult categories)
    if any(synonym in name_lower for synonym in synonyms_map["Kid"]):
        return "Kids"
        
    # 2. Check Women (handles words containing 'men' like 'women')
    if any(synonym in name_lower for synonym in synonyms_map["Women"]):
        return "Women"
        
    # 3. Check Men
    if any(synonym in name_lower for synonym in synonyms_map["Men"]):
        return "Men"
        
    # Default fallback
    return "Accessories"

def transform_product(product):
    """Transforms a single product dictionary into the desired format."""
    name = product.get("name", "")
    category = detect_category(name)
        
    # Extract the main image URL safely
    image_src = ""
    images = product.get("images", [])
    if images and len(images) > 0:
        image_src = images[0].get("src", "")
        
    return {
        "id": product.get("id"),
        "name": name,
        "image": image_src,
        "category": category,
        "featured": False,
        "items_sold": random.randint(10, 5000)
    }

def process_large_json(input_filepath, output_filepath):
    """Reads the 25k JSON lines file, transforms items, and writes output."""
    transformed_data = []
    
    try:
        # Scenario A: Try parsing as a standard single JSON array
        with open(input_filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if isinstance(data, list):
            transformed_data = [transform_product(item) for item in data]
        elif isinstance(data, dict):
            transformed_data = [transform_product(data)]
            
    except json.JSONDecodeError:
        # Scenario B: Fallback if it is a JSON Lines/NDJSON file (one object per line)
        print("Standard JSON parsing failed. Reading as JSON Lines format...")
        with open(input_filepath, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if not line:
                    continue
                try:
                    item = json.loads(line)
                    transformed_data.append(transform_product(item))
                except Exception as e:
                    print(f"Skipping invalid JSON on line {line_num}: {e}")

    # Write the clean array out to a file
    with open(output_filepath, 'w', encoding='utf-8') as f:
        json.dump(transformed_data, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully processed items! Saved to: {output_filepath}")

# Run the script over your file
process_large_json('product_dump.json', 'clean_products.json')