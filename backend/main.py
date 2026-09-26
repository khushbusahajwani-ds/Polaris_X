from routes.energy import router as energy_router
from alerts import router as alerts_router
app = FastAPI(title="POLARIS X API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "POLARIS X backend is running"}


app.include_router(energy_router, prefix="/api")
app.include_router(alerts_router, prefix="/api")
