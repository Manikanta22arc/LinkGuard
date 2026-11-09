"""
LinkGuard - Frontend Dashboard
A pure-Python frontend (Streamlit) for the LinkGuard malicious URL detector.

Run with:
    streamlit run app.py

This connects to your FastAPI backend (api/main.py) running on localhost:8000.
"""

import streamlit as st
import requests
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from datetime import datetime
import time
import json
import os

# ============================================================
# CONFIG
# ============================================================

API_URL = os.getenv("LINKGUARD_API_URL", "http://localhost:8000")
HISTORY_FILE = "check_history.json"

st.set_page_config(
    page_title="LinkGuard - URL Safety Checker",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ============================================================
# STYLING
# ============================================================

st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0;
    }
    .subtitle {
        color: #888;
        font-size: 1rem;
        margin-top: 0;
        margin-bottom: 2rem;
    }
    .safe-box {
        background-color: #d4edda;
        border-left: 5px solid #28a745;
        padding: 20px;
        border-radius: 8px;
        margin: 10px 0;
    }
    .danger-box {
        background-color: #f8d7da;
        border-left: 5px solid #dc3545;
        padding: 20px;
        border-radius: 8px;
        margin: 10px 0;
    }
    .metric-card {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        text-align: center;
    }
    .stButton button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        padding: 10px 24px;
        font-weight: 600;
    }
</style>
""", unsafe_allow_html=True)

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def load_history():
    """Load check history from local JSON file"""
    if os.path.exists(HISTORY_FILE):
        try:
            with open(HISTORY_FILE, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            return []
    return []


def save_history(history):
    """Save check history to local JSON file"""
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2)


def check_url_api(url: str):
    """Call the LinkGuard FastAPI backend to check a URL"""
    try:
        response = requests.post(
            f"{API_URL}/check-url",
            json={"url": url},
            timeout=5
        )
        response.raise_for_status()
        return response.json(), None
    except requests.exceptions.ConnectionError:
        return None, "Cannot connect to LinkGuard API. Is the backend running on localhost:8000?"
    except requests.exceptions.Timeout:
        return None, "Request timed out. The API may be overloaded."
    except requests.exceptions.RequestException as e:
        return None, f"Error: {str(e)}"


def check_api_health():
    """Check if the backend API is reachable"""
    try:
        response = requests.get(f"{API_URL}/", timeout=2)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False


# ============================================================
# SESSION STATE INIT
# ============================================================

if "history" not in st.session_state:
    st.session_state.history = load_history()

if "last_result" not in st.session_state:
    st.session_state.last_result = None

# ============================================================
# SIDEBAR
# ============================================================

with st.sidebar:
    st.markdown("## 🛡️ LinkGuard")
    st.markdown("---")

    # API health check
    api_online = check_api_health()
    if api_online:
        st.success("✓ Backend API Connected")
    else:
        st.error("✗ Backend API Offline")
        st.caption(f"Expected at: {API_URL}")
        st.caption("Run: `uvicorn main:app --port 8000` in your api/ folder")

    st.markdown("---")
    st.markdown("### Navigation")
    page = st.radio(
        "Go to",
        ["🔍 URL Checker", "📊 Dashboard", "📜 History", "⚙️ Settings"],
        label_visibility="collapsed"
    )

    st.markdown("---")
    st.markdown("### Quick Stats")
    total_checks = len(st.session_state.history)
    blocked_count = sum(1 for h in st.session_state.history if not h.get("safe", True))

    col1, col2 = st.columns(2)
    col1.metric("Checked", total_checks)
    col2.metric("Blocked", blocked_count)

    st.markdown("---")
    st.caption("LinkGuard v1.0")
    st.caption("Built with Python + FastAPI + Streamlit")

# ============================================================
# PAGE: URL CHECKER
# ============================================================

if page == "🔍 URL Checker":
    st.markdown('<p class="main-header">🛡️ LinkGuard</p>', unsafe_allow_html=True)
    st.markdown('<p class="subtitle">Check any URL for phishing and malware threats before you click</p>', unsafe_allow_html=True)

    col1, col2 = st.columns([4, 1])
    with col1:
        url_input = st.text_input(
            "Enter a URL to check",
            placeholder="https://example.com or paste any suspicious link",
            label_visibility="collapsed"
        )
    with col2:
        check_button = st.button("🔍 Check URL", use_container_width=True)

    # Sample URLs for quick testing
    st.caption("Try a sample:")
    sample_cols = st.columns(4)
    samples = [
        ("✅ github.com", "https://github.com"),
        ("✅ google.com", "https://google.com"),
        ("⚠️ Suspicious", "http://192.168.1.1/verify-secure-login"),
        ("⚠️ Phishing-like", "http://paypal-verify-account.ru/confirm"),
    ]
    for i, (label, sample_url) in enumerate(samples):
        if sample_cols[i].button(label, key=f"sample_{i}", use_container_width=True):
            url_input = sample_url
            check_button = True

    if check_button and url_input:
        with st.spinner("Checking URL against threat databases and ML model..."):
            time.sleep(0.3)  # brief pause for UX
            result, error = check_url_api(url_input)

        if error:
            st.error(f"⚠️ {error}")
            st.info("Make sure your FastAPI backend is running: `cd api && python main.py`")
        else:
            st.session_state.last_result = result

            # Save to history
            entry = {
                "url": result["url"],
                "safe": result["safe"],
                "score": result["score"],
                "reason": result["reason"],
                "timestamp": datetime.now().isoformat()
            }
            st.session_state.history.insert(0, entry)
            save_history(st.session_state.history)

            # Display result
            if result["safe"]:
                st.markdown(f"""
                <div class="safe-box">
                    <h3>✅ Safe to Visit</h3>
                    <p><strong>URL:</strong> {result['url']}</p>
                    <p><strong>Risk Score:</strong> {result['score']:.1%}</p>
                    <p><strong>Reason:</strong> {result['reason']}</p>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f"""
                <div class="danger-box">
                    <h3>🚨 Dangerous URL Detected</h3>
                    <p><strong>URL:</strong> {result['url']}</p>
                    <p><strong>Risk Score:</strong> {result['score']:.1%}</p>
                    <p><strong>Reason:</strong> {result['reason']}</p>
                    <p style="margin-top:10px; font-weight:600;">⛔ Do not visit this link.</p>
                </div>
                """, unsafe_allow_html=True)

            # Risk gauge
            fig = go.Figure(go.Indicator(
                mode="gauge+number",
                value=result["score"] * 100,
                title={"text": "Risk Score"},
                gauge={
                    "axis": {"range": [0, 100]},
                    "bar": {"color": "#dc3545" if not result["safe"] else "#28a745"},
                    "steps": [
                        {"range": [0, 40], "color": "#d4edda"},
                        {"range": [40, 70], "color": "#fff3cd"},
                        {"range": [70, 100], "color": "#f8d7da"},
                    ],
                }
            ))
            fig.update_layout(height=250, margin=dict(l=20, r=20, t=40, b=20))
            st.plotly_chart(fig, use_container_width=True)

    elif check_button and not url_input:
        st.warning("Please enter a URL to check.")

# ============================================================
# PAGE: DASHBOARD
# ============================================================

elif page == "📊 Dashboard":
    st.markdown('<p class="main-header">📊 Analytics Dashboard</p>', unsafe_allow_html=True)
    st.markdown('<p class="subtitle">Overview of your URL safety checks</p>', unsafe_allow_html=True)

    history = st.session_state.history

    if not history:
        st.info("No checks yet. Go to the URL Checker page to start scanning links.")
    else:
        df = pd.DataFrame(history)
        df["timestamp"] = pd.to_datetime(df["timestamp"])

        # Top metrics
        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Total Checks", len(df))
        col2.metric("Safe URLs", int(df["safe"].sum()))
        col3.metric("Blocked URLs", int((~df["safe"]).sum()))
        avg_risk = df["score"].mean() * 100
        col4.metric("Avg Risk Score", f"{avg_risk:.1f}%")

        st.markdown("---")

        col1, col2 = st.columns(2)

        with col1:
            st.subheader("Safe vs Dangerous")
            status_counts = df["safe"].map({True: "Safe", False: "Dangerous"}).value_counts()
            fig = px.pie(
                values=status_counts.values,
                names=status_counts.index,
                color=status_counts.index,
                color_discrete_map={"Safe": "#28a745", "Dangerous": "#dc3545"},
                hole=0.4
            )
            fig.update_layout(height=300, margin=dict(l=20, r=20, t=20, b=20))
            st.plotly_chart(fig, use_container_width=True)

        with col2:
            st.subheader("Risk Score Distribution")
            fig = px.histogram(
                df, x="score", nbins=20,
                color_discrete_sequence=["#667eea"]
            )
            fig.update_layout(
                height=300,
                margin=dict(l=20, r=20, t=20, b=20),
                xaxis_title="Risk Score",
                yaxis_title="Count"
            )
            st.plotly_chart(fig, use_container_width=True)

        st.subheader("Checks Over Time")
        df_daily = df.set_index("timestamp").resample("D").size().reset_index(name="count")
        fig = px.bar(df_daily, x="timestamp", y="count", color_discrete_sequence=["#764ba2"])
        fig.update_layout(height=300, margin=dict(l=20, r=20, t=20, b=20))
        st.plotly_chart(fig, use_container_width=True)

# ============================================================
# PAGE: HISTORY
# ============================================================

elif page == "📜 History":
    st.markdown('<p class="main-header">📜 Check History</p>', unsafe_allow_html=True)
    st.markdown('<p class="subtitle">All URLs you\'ve checked, most recent first</p>', unsafe_allow_html=True)

    history = st.session_state.history

    if not history:
        st.info("No history yet. Check a URL to get started.")
    else:
        col1, col2 = st.columns([3, 1])
        with col1:
            filter_option = st.selectbox("Filter", ["All", "Safe only", "Dangerous only"])
        with col2:
            if st.button("🗑️ Clear History", use_container_width=True):
                st.session_state.history = []
                save_history([])
                st.rerun()

        df = pd.DataFrame(history)

        if filter_option == "Safe only":
            df = df[df["safe"] == True]
        elif filter_option == "Dangerous only":
            df = df[df["safe"] == False]

        for _, row in df.iterrows():
            icon = "✅" if row["safe"] else "🚨"
            color = "#d4edda" if row["safe"] else "#f8d7da"
            with st.container():
                st.markdown(f"""
                <div style="background-color:{color}; padding:12px; border-radius:8px; margin-bottom:8px;">
                    <strong>{icon} {row['url']}</strong><br>
                    <small>Score: {row['score']:.1%} | {row['reason']} | {row['timestamp']}</small>
                </div>
                """, unsafe_allow_html=True)

# ============================================================
# PAGE: SETTINGS
# ============================================================

elif page == "⚙️ Settings":
    st.markdown('<p class="main-header">⚙️ Settings</p>', unsafe_allow_html=True)
    st.markdown('<p class="subtitle">Configure LinkGuard behavior</p>', unsafe_allow_html=True)

    st.subheader("Backend Connection")
    new_api_url = st.text_input("API URL", value=API_URL)
    if st.button("Test Connection"):
        try:
            r = requests.get(f"{new_api_url}/", timeout=3)
            if r.status_code == 200:
                st.success(f"✓ Connected successfully to {new_api_url}")
            else:
                st.error(f"Got status code {r.status_code}")
        except requests.exceptions.RequestException as e:
            st.error(f"Connection failed: {e}")

    st.markdown("---")
    st.subheader("Detection Sensitivity")
    threshold = st.slider(
        "Risk score threshold for blocking (higher = more permissive)",
        min_value=0.0, max_value=1.0, value=0.5, step=0.05
    )
    st.caption(f"URLs with a risk score above {threshold:.0%} will be flagged as dangerous.")
    st.caption("Note: this is a frontend display setting; the actual threshold is enforced in your FastAPI backend.")

    st.markdown("---")
    st.subheader("Data")
    if st.button("Export History as CSV"):
        if st.session_state.history:
            df = pd.DataFrame(st.session_state.history)
            csv = df.to_csv(index=False)
            st.download_button("Download CSV", csv, "linkguard_history.csv", "text/csv")
        else:
            st.warning("No history to export.")


from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    quantity: int

@app.get("/")
def home():
    return {"message": "Hello Mani"}

products = [
    Product(id=1, name="Phone", description="A smartphone", price=699.99, quantity=50),
    Product(id=2, name="Laptop", description="A powerful laptop", price=999.99, quantity=30),
    Product(id=3, name="Pen", description="A blue ink pen", price=1.99, quantity=100),
    Product(id=4, name="Table", description="A wooden table", price=199.99, quantity=20)
]

@app.get("/products")
def get_products():
    return products

@app.get("/products{id}")
def get_product_by_id(id:int):
    return products[id-1]

@app.post("/product")
def add_product(product: Product):
    products.append(product)
    return products

@app.put("/products")
def put_prodcuts(id:int ,products:Product):
    for i in range (len(products)):
        if products[i]==id:
            products[i]= Product
            return "succesfully added"
        
        return "not added"

@app.delete("/products")
def delete_products(id:int):
    for i in range(len(products)):
        if products[i]==Product:
            products[i]=Product
            del Product[i]
            return "deleted succesfully "
        
    return "deleted succesfully "