"""Validate a saved browser-agent extraction fixture; does not browse or call a model."""
from datetime import date
from pathlib import Path
from typing import Literal
import json
import sys

from pydantic import BaseModel, ConfigDict, Field, HttpUrl, ValidationError


class ExtractedProduct(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=1)
    price_text: str | None  # Required key; null means inspected but unavailable.
    page_url: HttpUrl
    observed_on: date
    evidence: Literal["visible_text", "page_metadata", "unknown"]


class Extraction(BaseModel):
    model_config = ConfigDict(extra="forbid")

    records: list[ExtractedProduct]
    complete: bool
    next_page: HttpUrl | None  # Required key; null means no next page was observed.


def main() -> int:
    fixture_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name("agent-extraction-fixture.json")
    try:
        parsed = Extraction.model_validate_json(fixture_path.read_text(encoding="utf-8"))
    except (OSError, ValidationError) as exc:
        print(f"Invalid extraction fixture: {exc}", file=sys.stderr)
        return 1
    print(json.dumps(parsed.model_dump(mode="json"), ensure_ascii=False, indent=2))
    print("Schema validation passed; factual accuracy and page coverage still need review.", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
