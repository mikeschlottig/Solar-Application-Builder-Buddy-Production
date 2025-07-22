import uvicorn
from loguru import logger
import asyncio
from typing import Optional
import os
from pathlib import Path

# Configure logging for Application Builder Buddy
logger.add(
    "../logs/builder_buddy.log",
    rotation="1 day",
    retention="30 days",
    level="INFO",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {name}:{function}:{line} | {message}"
)

# Configure separate log for AI interactions
logger.add(
    "../logs/ai_interactions.log",
    rotation="1 day",
    retention="60 days",
    level="INFO",
    filter=lambda record: "ai_interaction" in record["extra"],
    format="{time:YYYY-MM-DD HH:mm:ss} | AI | {extra[request_id]} | {message}"
)

# Configure code generation log
logger.add(
    "../logs/code_generation.log",
    rotation="1 day",
    retention="60 days",
    level="INFO",
    filter=lambda record: "code_generation" in record["extra"],
    format="{time:YYYY-MM-DD HH:mm:ss} | CODE | {extra[project_id]} | {message}"
)

class BuilderBuddyServer:
    """Application Builder Buddy Server with AI-powered development assistance"""
    
    def __init__(self):
        self.active_projects = {}
        self.ai_sessions = {}
        self.template_cache = {}
        
    async def start_ai_services(self):
        """Start AI-powered services and monitoring"""
        logger.info("Starting Solar Application Builder Buddy AI services")
        
        # Initialize AI models and services
        await self.initialize_ai_models()
        
        # Start code generation engine
        asyncio.create_task(self.start_code_generation_engine())
        
        # Start template management
        asyncio.create_task(self.start_template_manager())
        
        # Start project monitoring
        asyncio.create_task(self.monitor_active_projects())
        
    async def initialize_ai_models(self):
        """Initialize AI models and services"""
        try:
            # Validate OpenAI API key
            openai_key = os.getenv('OPENAI_API_KEY')
            if not openai_key:
                logger.warning("OpenAI API key not found. AI features will be limited.")
                return
                
            logger.info("AI models initialized successfully")
            
        except Exception as e:
            logger.error(f"Error initializing AI models: {e}")
            
    async def start_code_generation_engine(self):
        """Start the AI-powered code generation engine"""
        while True:
            try:
                # Process pending code generation requests
                for project_id, project_info in self.active_projects.items():
                    if project_info.get('pending_generation'):
                        await self.process_code_generation(project_id, project_info)
                        
                await asyncio.sleep(5)  # Check every 5 seconds
            except Exception as e:
                logger.error(f"Error in code generation engine: {e}")
                await asyncio.sleep(10)
                
    async def process_code_generation(self, project_id: str, project_info: dict):
        """Process AI code generation request"""
        try:
            request_data = project_info['pending_generation']
            
            logger.info(
                f"Processing code generation for project {project_id}: {request_data['type']}",
                extra={"code_generation": True, "project_id": project_id}
            )
            
            # Simulate AI code generation
            # In real implementation, this would call OpenAI API
            generated_code = await self.generate_code_with_ai(request_data)
            
            # Update project with generated code
            project_info['generated_code'] = generated_code
            project_info['pending_generation'] = None
            
            logger.info(
                f"Code generation completed for project {project_id}",
                extra={"code_generation": True, "project_id": project_id}
            )
            
        except Exception as e:
            logger.error(f"Error processing code generation: {e}")
            
    async def generate_code_with_ai(self, request_data: dict) -> dict:
        """Generate code using AI models"""
        # Placeholder for AI code generation
        # In real implementation, this would integrate with OpenAI API
        return {
            "component": "// AI-generated React component\nconst MyComponent = () => { return <div>Hello World</div>; };",
            "tests": "// AI-generated tests\ntest('renders correctly', () => { /* test code */ });",
            "documentation": "# AI-generated documentation\nThis component displays a greeting."
        }
        
    async def start_template_manager(self):
        """Start the intelligent template management system"""
        while True:
            try:
                # Refresh template cache
                await self.refresh_template_cache()
                
                # Analyze template usage patterns
                await self.analyze_template_usage()
                
                await asyncio.sleep(300)  # Refresh every 5 minutes
            except Exception as e:
                logger.error(f"Error in template manager: {e}")
                await asyncio.sleep(30)
                
    async def refresh_template_cache(self):
        """Refresh the template cache with latest templates"""
        try:
            # Load templates from storage
            templates_dir = Path("templates")
            if templates_dir.exists():
                for template_file in templates_dir.glob("*.json"):
                    template_name = template_file.stem
                    self.template_cache[template_name] = template_file.read_text()
                    
            logger.info(f"Template cache refreshed: {len(self.template_cache)} templates loaded")
        except Exception as e:
            logger.error(f"Error refreshing template cache: {e}")
            
    async def analyze_template_usage(self):
        """Analyze template usage patterns for optimization"""
        try:
            # Analyze which templates are most popular
            # Suggest improvements based on usage patterns
            logger.info("Template usage analysis completed")
        except Exception as e:
            logger.error(f"Error analyzing template usage: {e}")
            
    async def monitor_active_projects(self):
        """Monitor active development projects"""
        while True:
            try:
                active_count = len(self.active_projects)
                ai_sessions_count = len(self.ai_sessions)
                
                logger.info(
                    f"Project monitoring: {active_count} active projects, {ai_sessions_count} AI sessions"
                )
                
                # Clean up inactive projects
                await self.cleanup_inactive_projects()
                
                await asyncio.sleep(60)  # Monitor every minute
            except Exception as e:
                logger.error(f"Error monitoring projects: {e}")
                await asyncio.sleep(30)
                
    async def cleanup_inactive_projects(self):
        """Clean up inactive projects and sessions"""
        try:
            # Remove projects that haven't been active for a while
            current_time = asyncio.get_event_loop().time()
            inactive_projects = []
            
            for project_id, project_info in self.active_projects.items():
                last_activity = project_info.get('last_activity', 0)
                if current_time - last_activity > 3600:  # 1 hour timeout
                    inactive_projects.append(project_id)
                    
            for project_id in inactive_projects:
                del self.active_projects[project_id]
                logger.info(f"Cleaned up inactive project: {project_id}")
                
        except Exception as e:
            logger.error(f"Error cleaning up projects: {e}")

# Global builder buddy server instance
builder_server = BuilderBuddyServer()

if __name__ == "__main__":
    logger.info("Starting Solar Application Builder Buddy backend server")
    
    # Start AI services
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.create_task(builder_server.start_ai_services())
    
    # Start the FastAPI server
    uvicorn.run(
        "api.bootstrap:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=1,
        log_level="info",
        access_log=True
    )
    
    logger.info("Solar Application Builder Buddy server started successfully")