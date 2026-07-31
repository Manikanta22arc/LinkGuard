from app.ai.llm_explainer import explain_url


def generate_ai_report(url, prediction):
    return explain_url(url, prediction)