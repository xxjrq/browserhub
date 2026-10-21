"""Read the title of the active page in an authorized local Chrome session.

Prerequisites: Python 3.11+, browser-use, an OpenAI API key, and Chrome
started with a dedicated non-default user-data directory and CDP port.
This example attaches to a browser you started; it does not launch Chrome.
"""

import asyncio
import os

from browser_use import Agent
from browser_use.browser import BrowserProfile, BrowserSession
from browser_use.llm import ChatOpenAI


async def main() -> None:
    session = BrowserSession(
        browser_profile=BrowserProfile(
            cdp_url=os.getenv("CDP_URL", "http://127.0.0.1:9222"),
            is_local=True,
            keep_alive=True,
        )
    )
    try:
        agent = Agent(
            task="Read the title of the currently open page and report it. Do not navigate, click, submit forms, or change account data.",
            llm=ChatOpenAI(model=os.getenv("OPENAI_MODEL", "gpt-4.1-mini")),
            browser_session=session,
        )
        await agent.run()
    finally:
        # Agent.run() closes the Agent in its own finally block. keep_alive=True
        # prevents that close from killing the attached Chrome process. stop()
        # then releases this Browser Use session without closing Chrome.
        await session.stop()


if __name__ == "__main__":
    asyncio.run(main())
